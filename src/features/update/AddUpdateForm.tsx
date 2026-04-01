'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAddUpdate } from './useUpdates';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { useProjects } from '@/features/project/useProjects';

interface AddUpdateFormProps {
  projectId: string;
}

export function AddUpdateForm({ projectId }: AddUpdateFormProps) {
  const [text, setText] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  
  const { data: projects } = useProjects();
  const project = projects?.find((p) => p.id === projectId);
  
  const addUpdate = useAddUpdate();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUpdate.mutate(
      { projectId, text, fileUrl: fileUrl || undefined },
      {
        onSuccess: () => {
          setText('');
          setFileUrl('');
          router.push(`/projects/${projectId}`);
        },
      }
    );
  };

  return (
    <Card className="max-w-md mx-auto mt-6">
      <CardHeader>
        <CardTitle>Add Update</CardTitle>
        {project && <CardDescription>For project: {project.name}</CardDescription>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Update Details</Label>
            <Textarea
              id="text"
              placeholder="What did you work on?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={5}
              className="resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fileUrl">Attachment or Photo URL (Optional)</Label>
            <Input
              id="fileUrl"
              placeholder="https://example.com/image.png"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
            />
          </div>
          <div className="pt-2 flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full"
              disabled={addUpdate.isPending || !text.trim()}
            >
              {addUpdate.isPending ? 'Posting...' : 'Post Update'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
