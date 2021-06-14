import { Ability, AbilityBuilder, ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "../users/user.entity";
import { Action } from "./action";
import { Article } from "./article";

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User, ) {
    const { can, cannot, rules } = new AbilityBuilder(Ability);

    const roles = [
      'user',
      'admin',
      'sale'
    ];

    let moduleList = [
      { "nameModule": "Users", "handle": ["create", "update", "readById", "read", "delete"] },
      { "nameModule": "Posts", "handle": ["create", "update", "read"] },
      { "nameModule": "News", "handle": ["create", "read"] },
    ];

    for (const item of moduleList) {
      // if (user.isAdmin) {
      //   can(Action.Manage, name[0].name);
      // } else {
      //   cannot(Action.Manage, name);
      //   can(Action.Read, name);
      // }
      // console.log();
    }

    return new Ability(rules);
  }
}