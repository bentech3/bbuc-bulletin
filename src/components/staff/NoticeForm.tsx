import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, Save, Send } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Database } from "@/integrations/supabase/types";

type NoticeCategory = Database["public"]["Enums"]["notice_category"];
type NoticePriority = Database["public"]["Enums"]["notice_priority"];

export const NoticeForm = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<NoticeCategory>("general");
  const [priority, setPriority] = useState<NoticePriority>("normal");
  const [publishAt, setPublishAt] = useState("");
  const [expireAt, setExpireAt] = useState("");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
  const [targetAudience, setTargetAudience] = useState<string[]>(["all"]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const { data } = await supabase.from("departments").select("*");
    setDepartments(data || []);
  };

  const uploadFile = async (file: File, bucket: string): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage.from(bucket).upload(filePath, file);

    if (error) {
      toast.error(`Failed to upload ${file.name}`);
      return null;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (status: "draft" | "pending") => {
    if (!user) return;
    
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setSubmitting(true);

    try {
      let bannerUrl = null;
      if (bannerFile) {
        bannerUrl = await uploadFile(bannerFile, "notice-banners");
      }

      const attachments = [];
      for (const file of attachmentFiles) {
        const url = await uploadFile(file, "notice-attachments");
        if (url) {
          attachments.push({
            name: file.name,
            url,
            type: file.type,
            size: file.size,
          });
        }
      }

      const { error } = await supabase.from("notices").insert({
        title,
        content,
        category,
        priority,
        status,
        author_id: user.id,
        banner_url: bannerUrl,
        attachments: attachments.length > 0 ? attachments : null,
        target_audience: targetAudience,
        publish_at: publishAt || null,
        expire_at: expireAt || null,
      });

      if (error) throw error;

      toast.success(
        status === "draft"
          ? "Notice saved as draft"
          : "Notice submitted for approval"
      );
      
      resetForm();
    } catch (error: any) {
      toast.error("Failed to create notice: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("general");
    setPriority("normal");
    setPublishAt("");
    setExpireAt("");
    setBannerFile(null);
    setAttachmentFiles([]);
    setTargetAudience(["all"]);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle>Create Notice</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notice title"
            required
          />
        </div>

        <div>
          <Label>Content *</Label>
          <div className="mt-2">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              className="bg-background"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as NoticeCategory)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="administration">Administration</SelectItem>
                <SelectItem value="student_affairs">Student Affairs</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="announcements">Announcements</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={(v) => setPriority(v as NoticePriority)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="publishAt">Publish Date (Optional)</Label>
            <Input
              id="publishAt"
              type="datetime-local"
              value={publishAt}
              onChange={(e) => setPublishAt(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="expireAt">Expiry Date (Optional)</Label>
            <Input
              id="expireAt"
              type="datetime-local"
              value={expireAt}
              onChange={(e) => setExpireAt(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="banner">Banner Image (Optional)</Label>
          <Input
            id="banner"
            type="file"
            accept="image/*"
            onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
            className="cursor-pointer"
          />
        </div>

        <div>
          <Label htmlFor="attachments">Attachments (Optional)</Label>
          <Input
            id="attachments"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov"
            onChange={(e) => setAttachmentFiles(Array.from(e.target.files || []))}
            className="cursor-pointer"
          />
          {attachmentFiles.length > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              {attachmentFiles.length} file(s) selected
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => handleSubmit("draft")}
            disabled={submitting}
            variant="outline"
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Save as Draft
          </Button>
          <Button
            onClick={() => handleSubmit("pending")}
            disabled={submitting}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            Submit for Approval
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
