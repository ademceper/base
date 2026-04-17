import type { Meta, StoryObj } from "@storybook/react"
import { createKcPageStory } from "../KcPageStory"

const { KcPageStory } = createKcPageStory({ pageId: "login-x509-info.ftl" })

const meta = {
  title: "login/LoginX509Info",
  component: KcPageStory,
} satisfies Meta<typeof KcPageStory>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <KcPageStory />,
}
