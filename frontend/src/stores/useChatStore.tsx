import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { User, Message } from "@/types";
import axios from "axios";
// import io from '../../node_modules/socket.io-client/build/cjs/browser-entrypoint.d'
import { io, Socket } from 'socket.io-client';



interface ChatStore {
  users: User[];
  userId : string,
  isLoading: boolean;
  error: string | null;
  socket: Socket; // Explicitly typed as Socket from socket.io-client
  isConnected : boolean;
  onlineUsers : Set<string>;
  userActivities : Map<string, string>;
  messages : Message[];
  selectedUserId: User | null;
  currentUserId: string | null;

  

  fetchUsers: () => Promise<void>;
  fetchMessages: (userId: string) => Promise<void>;
  initSocket: (userId: string)  => void;
  discnnectedSocket: () => void;
  sendMessage: (receiverId : string, senderId : string, content : string) => void;
  setSelectedUserId: (user: User | null) => void;
}

const baseUrl ="http://localhost:3001";
const socket: Socket = io(baseUrl, {
   autoConnect: false, // only connect if user is authenticated
   withCredentials :true
})

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  userId: 'user_2y5rl2EZu6zM96vRGbOY4p5DVmW',
  isLoading: false,
  error: null,
  socket : socket,
  isConnected : false,
  onlineUsers : new Set(),
  userActivities : new Map(),
  messages : [],
  selectedUserId : null,
  currentUserId: null, // Initialize with the userId from socket auth if available

  setSelectedUserId: (user) => set({ selectedUserId: user}),


  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/users');
      set({
        users: response.data,
        isLoading: false,
        error: null
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({ isLoading: false, error: error.response?.data?.message || "Unknown error" });
      } else {
        set({ isLoading: false, error: "An unexpected error occurred" });
      }
    }
    finally{
        set({ isLoading: false });
    }
  },

  initSocket: (userId) => {
		if (!get().isConnected) {

			socket.auth = { userId };
      // console.log("socket.auth in useChatstore: ", socket.auth.userId)
    
      
			socket.connect();

      set({ currentUserId: socket.auth.userId });
      console.log("currentUserId in useChatStore: ", get().currentUserId);


			socket.emit("user_connected", userId || get().currentUserId);

			socket.on("users_online", (users: string[]) => {
				set({ onlineUsers: new Set(users) });
			});

			socket.on("activities", (activities: [string, string][]) => {
				set({ userActivities: new Map(activities) });
			});

			socket.on("user_connected", (userId: string) => {
				set((state) => ({
					onlineUsers: new Set([...state.onlineUsers, userId]),
				}));
			});

      socket.on("user_disconnected", (userId: string) => {
				set((state) => {
					const newOnlineUsers = new Set(state.onlineUsers);
					newOnlineUsers.delete(userId);
					return { onlineUsers: newOnlineUsers };
				});
			});

			socket.on("receive_message", (message: Message) => {
				set((state) => ({
					messages: [...state.messages, message],
				}));
			});

			socket.on("message_sent", (message: Message) => {
				set((state) => ({
					messages: [...state.messages, message],
				}));
			});

			socket.on("activity_updated", ({ userId, activity }) => {
				set((state) => {
					const newActivities = new Map(state.userActivities);
					newActivities.set(userId, activity);
					return { userActivities: newActivities };
				});
			});

			set({ isConnected: true });
    }
  },
  discnnectedSocket: async () => {
    if (get().isConnected) {
			socket.disconnect();
			set({ isConnected: false });
		}
  },
  sendMessage: async (receiverId, senderId, content) => {
		const socket = get().socket;
		if (!socket) return;

		socket.emit("send_message", { receiverId, senderId, content });
	},

  fetchMessages: async (userId: string) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/users/messages/${userId}`);
			set({ messages: response.data });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        set({ error: error.response?.data?.message || "Unknown error" });
      } else {
        set({ error: "An unexpected error occurred" });
      }
    } finally {
			set({ isLoading: false });
		}
	},
}));
