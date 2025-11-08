import RigidBody from '@/rigid-body';

export default class Engine {
  private _rigidBodies: RigidBody[] = [];

  public addBody(body: RigidBody) {
    this._rigidBodies.push(body);
  }

  public update(deltaTime: number) {
    for (let i = 0; i < this._rigidBodies.length; i++) {
      const rigidBody = this._rigidBodies[i];
      rigidBody.update(deltaTime);
    }
  }
}
