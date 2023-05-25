export class Login {
    // false(response: { id_token: string; }, false: any): void {
    //   throw new Error('Method not implemented.');
    // }
    constructor(public username: string, public password: string, public rememberMe: boolean) {}
  }
  