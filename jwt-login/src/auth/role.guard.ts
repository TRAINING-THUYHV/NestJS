import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../users/user.entity';
import { Action } from './action';
import { Article } from './article';
import { CaslAbilityFactory } from './casl-ability.factory';


@Injectable()
export class RoleGuard implements CanActivate {
    constructor (
        private caslAbilityFactory: CaslAbilityFactory
    ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const user = new User();
    user.isAdmin = false;
    user.email = "email@gmail.com";

    const ability = this.caslAbilityFactory.createForUser(user);

    const moduleName = 'Users';

    if (user.isAdmin) {
        console.log(ability.can(Action.Create, moduleName));
        console.log(ability.can(Action.Delete, moduleName));
        console.log(ability.can(Action.Read, moduleName));
        console.log(ability.can(Action.Update, moduleName));
    } else {
        console.log(ability.can(Action.Create, moduleName));
        console.log(ability.can(Action.Delete, moduleName));
        console.log(ability.can(Action.Update, moduleName));
        console.log(ability.can(Action.Read, moduleName));
    }

    const article = new Article();
    article.authorId = "1";

    console.log("TEST" + ability.can(Action.Delete, article));

    return true;
  }
}