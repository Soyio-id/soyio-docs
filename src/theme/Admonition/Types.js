import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';
import clsx from 'clsx';

function ChileAdmonition(props) {
  // Based on the default note admonition
  const NoteAdmonition = DefaultAdmonitionTypes.note;

  return (
    <NoteAdmonition
      {...props}
      icon="🇨🇱"
      className={clsx('alert--chile')}
      title={props.title || 'Chile'}
    >
      {props.children}
    </NoteAdmonition>
  );
}

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,
  'chile': ChileAdmonition,
};

export default AdmonitionTypes;