import type { Meta, StoryObj } from "@storybook/react"
import { createKcPageStory } from "../KcPageStory"

const { KcPageStory } = createKcPageStory({ pageId: "saml-post-form.ftl" })

const meta = {
  title: "login/SamlPostForm",
  component: KcPageStory,
} satisfies Meta<typeof KcPageStory>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <KcPageStory />,
}
