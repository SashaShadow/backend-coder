import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { isValidPassword } from '../../utils/crypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        
        if (user && isValidPassword(pass, user.password)) {
            user.password = undefined;
            return user;
        }
        return null;
      }
}
