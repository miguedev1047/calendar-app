import * as s from 'drizzle-orm/sqlite-core'

export const event = s.sqliteTable('event', {
  id: s
    .text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: s.text('title').$defaultFn(() => '(no title)'),
  description: s.text('description'),
  startDate: s.integer('startDate', { mode: 'timestamp' }).$default(() => new Date()),
  endDate: s.integer('endDate', { mode: 'timestamp' }).$default(() => new Date()),
  color: s.text('color').default('BLUE'),
  createAt: s
    .integer('createAt', { mode: 'timestamp' })
    .$default(() => new Date())
    .notNull()
})
