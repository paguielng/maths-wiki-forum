import React, { useState } from 'react';
import { MessageCircle, Send, ThumbsUp, Reply, Flag } from 'lucide-react';

interface CommentData {
  id: string;
  author: string;
  date: string;
  content: string;
  likes: number;
  replies?: CommentData[];
}

interface CommentsProps {
  comments: CommentData[];
}

const CommentItem: React.FC<{ comment: CommentData; level?: number }> = ({ 
  comment,
  level = 0
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(comment.likes);

  const handleLike = () => {
    if (!liked) {
      setLocalLikes(prev => prev + 1);
      setLiked(true);
    } else {
      setLocalLikes(prev => prev - 1);
      setLiked(false);
    }
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit the reply to an API
    alert(`Nouvelle réponse: ${replyContent}`);
    setIsReplying(false);
    setReplyContent('');
  };

  return (
    <div className={`${level > 0 ? 'ml-6 pl-4 border-l-2 border-gray-200' : ''}`}>
      <div className="flex gap-3 mb-3">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-lg font-semibold">
          {comment.author.charAt(0).toUpperCase()}
        </div>
        <div className="flex-grow">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-medium text-gray-900">{comment.author}</span>
            <span className="text-xs text-gray-500">{comment.date}</span>
          </div>
          <p className="text-gray-700">{comment.content}</p>
          
          <div className="flex gap-4 mt-2">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1 text-xs ${
                liked ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
              } transition`}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>{localLikes}</span>
            </button>
            
            <button 
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition"
            >
              <Reply className="h-3.5 w-3.5" />
              <span>Répondre</span>
            </button>
            
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition">
              <Flag className="h-3.5 w-3.5" />
              <span>Signaler</span>
            </button>
          </div>
          
          {isReplying && (
            <form onSubmit={handleReplySubmit} className="mt-3">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Écrivez votre réponse..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                rows={2}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsReplying(false)}
                  className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!replyContent.trim()}
                  className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Répondre
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2 space-y-3">
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit the comment to an API
    alert(`Nouveau commentaire: ${newComment}`);
    setNewComment('');
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-blue-700" />
        <h3 className="font-medium text-lg">Discussion ({comments.length})</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Partagez vos réflexions ou posez une question..."
            className="w-full p-3 focus:outline-none"
            rows={3}
          />
          <div className="flex justify-between items-center bg-gray-50 p-2">
            <span className="text-xs text-gray-500">
              Soyez respectueux et constructif dans vos commentaires.
            </span>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              <span>Publier</span>
            </button>
          </div>
        </div>
      </form>
      
      <div className="space-y-4">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;