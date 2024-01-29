import { useEffect, useState } from "react"
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa'
import { useSelector } from "react-redux";
import { Textarea } from "flowbite-react";

export default function Comment({comment, onLike}) {
    const {currentUser} = useSelector((state) => state.user)
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content)
    useEffect(() => {
        const getUser = async () => {
            try{
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if(res.ok){
                    setUser(data)
                }
            }catch(error){
                console.log(error.message);
            }
        }
        getUser();
    }, [comment])

    const handleEdit = async() => {
        setIsEditing(true);
    }

  return (
    <div className="flex p-4 border-b dark: border-gray-600 text-sm">
        <div className="flex-shrink-0 mr-3">
            <img className="w-10 h-10 rounded-full bg-gray-200" src={user.profilePicture}  alt={user.username} />
        </div>
        <div className="flex-1">
            <div className="flex items-center mb-1">
                <span className="font-bold mr-1 text-xs truncate">{user ? `@${user.username}` : 'anonymous user'}</span>
                <span className="text-gray-500 text-xs">{moment(comment.createdAt).fromNow()}</span>
            </div>
            {
                isEditing ? (
                    <Textarea className="w-full p-2 text-gray-700 rounded-md resize-none focus:outline-none focus:bg-gray-100" rows='3' value={editedContent} onChange={(e) => setComment(e.target.value)} />
                ) : (
                <>
                <p className="text-gray-500 pb-2">{comment.content}</p>
                <div className="flex items-center pt-2 text-xs border-t dark: border-gray-700 max-w-fit gap-2">
                    <button type='button' onClick={() => onLike(comment._id)} className={`text-gray-400 hover:text-blue-500 ${
                        currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
                    <FaThumbsUp className="text-sm" />
                    </button>
                    <p className="text-gray-400">{comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")}</p>
                    {
                        currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                            <button onClick={handleEdit} type='button' className='text-gray-400 hover:text-blue-500'>
                                Edit
                            </button>
                        )
                    }
                </div>
            </>
            )}
        </div>
    </div>
  )
}
