import { FunctionComponent } from 'react';
import { DiscussionEmbed } from 'disqus-react';

interface Props {
  url: string,
  identifier: string,
  title: string,
};

export const DisqusComments: FunctionComponent<Props> = (props: Props) => {
  const { url, identifier, title } = props;

  const disqusShortname = 'splatter-1';

  const disqusConfig = { url, identifier, title };

  return (
    <DiscussionEmbed
      shortname={disqusShortname}
      config={disqusConfig}
    />
  )
}