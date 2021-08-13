export class UserCredentials {
  constructor(public username: string, public password: string) {}
}

export class ImageAuthor {
  constructor(public username: string, public id: string) {}
}

export class Blog {
  constructor(public title: string, public blog: string, public imageUrl: string, public id: string, public user: ImageAuthor) {}
}
