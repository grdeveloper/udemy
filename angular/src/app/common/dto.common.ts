export class User {
  constructor(public id: string, public username: string, public token?: string) {}
}

export class UserCredentials {
  constructor(public username: string, public password: string) {}
}

export class BlogInfo {
  constructor(public title: string, public blog: string, public imageUrl: string, public id: string, public user: User) {}
}

export class BlogCredentials {
  constructor(public title: string, public blog: string, public imageUrl: File, public id?: string) {}
}
