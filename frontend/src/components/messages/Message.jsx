import { useAuthContext } from '../../context/AuthContext'
import { extractTime } from '../../utils/extractTime'
import useConversations from '../../zustand/useConversation'

const Message = ({ message }) => {
  const { authUser } = useAuthContext()
  const { selectedConversation } = useConversations()
  const fromMe = message.senderId === authUser._id
  const chatClassBubble = fromMe ? 'chat-end' : 'chat-start'
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic
  const bubbleBgColor = fromMe ? 'bg-blue-500' : ''
  const formattedTime = extractTime(message.createdAt)
  const shakeClass = message.shouldShake ? 'shake' : ''

  console.log(message.shouldShake)

  return (
    <div className={`chat ${chatClassBubble}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="Tailwind CSS chat bubble component" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${shakeClass} pb-2 ${bubbleBgColor}`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  )
}

export default Message
