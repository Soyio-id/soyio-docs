import type { Props } from '@theme/Root';
import IntercomSupportLauncher from '../components/IntercomSupportLauncher';

export default function Root({ children }: Props) {
  return (
    <>
      {children}
      <IntercomSupportLauncher />
    </>
  );
}
