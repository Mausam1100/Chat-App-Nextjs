import { create } from "zustand";

type LatestMessage = {  
  content: string;
  receiverId: number;
  senderId: number;
};

type User = {
    id: number,
    fullName: string,
    email: string,
    imageUrl: string | null,
    latestMessage?: LatestMessage | null
}

type UnreadCountStore = {
  unreadCounts: Record<number, number>;
  incrementUnread: (senderId: number) => void;
  clearUnread: (senderId: number) => void;
};

interface MessageType {
  content: string,
  senderId: number,
  receiverId: number,
  sender?: {
    id: number,
    fullName: string,
    email: string,
    imageUrl: string
  }
}

type MessageStore = {
  messages: MessageType[],
  addMessage: (message: MessageType) => void,
  setMessages: (message: MessageType[] ) => void,
  clearMessages: () => void
}

type SearchUser = {
    searchUsers: User[],
    setSearchUsers: (users: User[]) => void;
}

type SelectedUser = {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
};

interface ChatUserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  addOrMoveUser: (user: User) => void;
  removeUser: (userId: number) => void;
  updateLatestMessage: (
    userId: number,
    message: LatestMessage
  ) => void;
}

export const useSearchUser = create<SearchUser>((set) => ({
    searchUsers: [],
    setSearchUsers: (searchUsers) => set({searchUsers})
}))

export const useSelectedUser = create<SelectedUser>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}));

export const useChatUsers = create<ChatUserStore>((set) => ({
  users: [],

  setUsers: (users) => {set({ users });},

  addOrMoveUser: (user) => {
    set((state) => ({
      users: [
        user,
        ...state.users.filter((u) => u.id !== user.id),
      ],
    }));
  },
  removeUser: (userId) => {
    set((state) => ({
      users: state.users.filter((u) => u.id !== userId)
    }))
  },
  updateLatestMessage: (userId, message) => {
  set((state) => {
    const user = state.users.find((u) => u.id === userId);

    if (!user) return state;

    const updatedUser = {
      ...user,
      latestMessage: message,
    };

    return {
      users: [
        updatedUser,
        ...state.users.filter((u) => u.id !== userId),
      ],
    };
  });
},
}));

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message]
    }))
  },
  setMessages: (messages) => {
    set({
      messages
    })
  },
  clearMessages: () => {
    set({
      messages: []
    })
  }
}))

export const useUnreadCountStore = create<UnreadCountStore>((set) => ({
  unreadCounts: {},

  incrementUnread: (senderId) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [senderId]: (state.unreadCounts[senderId] || 0) + 1,
      },
    })),

  clearUnread: (senderId) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [senderId]: 0,
      },
    })),
}));

