// User database with dynamic registration and login/logout tracking
export let users = [
  {
    id: 1,
    email: "user@example.com",
    password: "password",
    name: "Demo User",
    role: "user",
    createdAt: "2024-01-01"
  },
  {
    id: 2,
    email: "admin@foodie.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    createdAt: "2024-01-01"
  },
  {
    id: 3,
    email: "illakshmi2705@gmail.com",
    password: "user123",
    name: "Illakshmi",
    role: "user",
    createdAt: "2024-01-01"
  }
];

// Activity log for tracking login/logout
export let activityLog = [];

export const addActivity = (userId, action, timestamp = new Date()) => {
  const user = users.find(u => u.id === userId);
  activityLog.push({
    id: activityLog.length + 1,
    userId,
    userName: user?.name || "Unknown",
    userEmail: user?.email || "Unknown",
    action, // "login", "logout", "register"
    timestamp: timestamp.toISOString(),
    date: timestamp.toLocaleDateString(),
    time: timestamp.toLocaleTimeString()
  });
};

export const getActivityLog = () => {
  return activityLog.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const authenticateUser = (email, password) => {
  const user = users.find(u => u.email === email && u.password === password);
  return user;
};

export const registerUser = (userData) => {
  // Check if email already exists
  const existingUser = users.find(u => u.email === userData.email);
  if (existingUser) {
    return { success: false, message: "Email already registered" };
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    email: userData.email,
    password: userData.password,
    name: userData.name,
    role: "user", // Default role is user
    createdAt: new Date().toISOString().split('T')[0]
  };

  users.push(newUser);
  
  // Log the registration activity
  addActivity(newUser.id, "register");
  
  return { success: true, user: newUser };
};

export const getAllUsers = () => {
  return users;
};

export const deleteUser = (userId) => {
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    const deletedUser = users[userIndex];
    users = users.filter(u => u.id !== userId);
    addActivity(userId, "deleted");
    return { success: true, user: deletedUser };
  }
  return { success: false, message: "User not found" };
}; 