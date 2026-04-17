import type { Meta, StoryObj } from "@storybook/react"
import { createKcPageStory } from "../KcPageStory"

const { KcPageStory } = createKcPageStory({ pageId: "delete-account-confirm.ftl" })

const meta = {
  title: "login/DeleteAccountConfirm",
  component: KcPageStory,
} satisfies Meta<typeof KcPageStory>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <KcPageStory />,
}
