import { RigidBody } from '@newton-js/core';
import { Sprite } from 'pixi.js';

export interface Entity {
  id: string;
  sprite: Sprite;
  body: RigidBody;
}
