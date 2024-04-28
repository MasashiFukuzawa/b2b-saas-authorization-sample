import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';
import { css } from 'hono/css';
import { createRoute } from 'honox/factory';
import Counter from '../islands/counter';

const className = css`
  font-family: sans-serif;
`;

export default createRoute(async (c) => {
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });
  const tenants = await prisma.tenant.findMany();

  const name = c.req.query('name') ?? 'Hono';
  const tenantName = tenants[0].name;
  return c.render(
    <div class={className}>
      <h1>Hello, {tenantName}!</h1>
      <Counter />
    </div>,
    { title: name }
  );
});
