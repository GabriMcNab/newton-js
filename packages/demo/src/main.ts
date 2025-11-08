import { Application, Assets, Container, Sprite } from 'pixi.js';
import { Engine, RigidBody, Vector2 } from '@newton-js/core';
import { nanoid } from 'nanoid';
import { Entity } from './types';

// Load assets

const bunnyTexture = await Assets.load('/assets/bunny.png');

// State

let entities: Record<string, Entity> = {};

// Entities

const bunny1 = createBunny(new Vector2(-100, 0));
const bunny2 = createBunny(new Vector2(100, 0));

entities = {
  [bunny1.id]: bunny1,
  [bunny2.id]: bunny2,
};

async function main() {
  const app = await setupScene(entities);
  document.body.appendChild(app.canvas);

  const physicsEngine = new Engine();
  Object.values(entities).forEach((entity) => {
    physicsEngine.addBody(entity.body);
  });

  app.ticker.add((ticker) => {
    physicsEngine.update(ticker.deltaTime);
    Object.values(entities).forEach((entity) => {
      entity.sprite.position.set(entity.body.position.x, entity.body.position.y);
    });
  });
}

// Helpers

async function setupScene(entities: Record<Entity['id'], Entity>) {
  const app = new Application();
  await app.init({ background: '#1099bb', resizeTo: window });

  const container = new Container();
  container.position.set(app.screen.width / 2, app.screen.height / 2);

  // Setup scene
  for (const entity of Object.values(entities)) {
    container.addChild(entity.sprite);
  }

  app.stage.addChild(container);

  return app;
}

function createBunny(position: Vector2): Entity {
  const bunny = new Sprite(bunnyTexture);
  bunny.position.set(position.x, position.y);
  return {
    id: nanoid(),
    sprite: bunny,
    body: new RigidBody({
      initialPosition: position,
      initialVelocity: new Vector2(0, Math.random() * 10),
    }),
  };
}

// Run

main();
