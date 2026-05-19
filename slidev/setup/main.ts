// Slidev setup hook. Runs once when the deck boots, giving us a place to
// register Vue plugins, components, or directives globally. Add things here
// only if every workshop needs them.
import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(({ app, router }) => {
  // Reserved for future global registrations (analytics, plugins, etc.).
  // Components in /components are auto-imported by Slidev, so this is empty
  // by default.
  void app
  void router
})
