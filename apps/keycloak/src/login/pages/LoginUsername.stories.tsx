import type { Meta, StoryObj } from "@storybook/react"
import { createKcPageStory } from "../KcPageStory"

const { KcPageStory } = createKcPageStory({ pageId: "login-username.ftl" })

const meta = {
  title: "login/LoginUsername",
  component: KcPageStory,
} satisfies Meta<typeof KcPageStory>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <KcPageStory />,
}
