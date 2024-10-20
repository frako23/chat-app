import useGetConversations from '../../hooks/useGetConversations'
import Conversation from './Conversation'

const Conversations = () => {
  const { loading, conversations } = useGetConversations()
  console.log('Conversations:', conversations)

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation.id}
          conversation={conversation}
          lastIdx={idx === conversations.legnth - 1}
        />
      ))}
    </div>
  )
}

export default Conversations
