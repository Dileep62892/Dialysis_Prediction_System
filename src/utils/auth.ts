import { User } from '../types/health';

class Auth {
  private storageKey = 'dialysis_app_user';
  private usersKey = 'dialysis_app_users';

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.storageKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  async login(email: string, password: string): Promise<User | null> {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem(this.storageKey, JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    }
    return null;
  }

  async signup(email: string, password: string): Promise<User> {
    const users = this.getUsers();
    
    if (users.some(u => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
      name: email.split('@')[0]
    };

    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(this.storageKey, JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  private getUsers(): User[] {
    const usersStr = localStorage.getItem(this.usersKey);
    return usersStr ? JSON.parse(usersStr) : [];
  }
}

export const auth = new Auth();