import type { Meta, StoryObj } from "@storybook/react"
import { createKcPageStory } from "../KcPageStory"

const { KcPageStory } = createKcPageStory({ pageId: "login-reset-otp.ftl" })

const meta = {
  title: "login/LoginResetOtp",
  component: KcPageStory,
} satisfies Meta<typeof KcPageStory>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <KcPageStory />,
}
