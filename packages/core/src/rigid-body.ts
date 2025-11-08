import Vector2 from '@/vector2';

export default class RigidBody {
  private _mass = 1;
  private _position: Vector2;
  private _velocity: Vector2;

  get position() {
    return this._position;
  }

  constructor(opt?: { initialPosition?: Vector2; initialVelocity?: Vector2; mass?: number }) {
    this._mass = opt?.mass ?? 1;
    this._position = opt?.initialPosition ?? new Vector2(0, 0);
    this._velocity = opt?.initialVelocity ?? new Vector2(0, 0);
  }

  /**
   * @internal - Only used by Engine.
   */
  public update(dt: number) {
    this._position.x += this._velocity.x * dt;
    this._position.y += this._velocity.y * dt;
  }
}
