import { Box } from '@mantine/core';
import {
  IconActivity,
  IconChevronRight,
  IconFingerprint,
  IconGauge,
} from '@tabler/icons-react';
import { useState } from 'react';
import { NavLink } from '@mantine/core';
import { Profile } from '../../pages/Profile/Profile';

const data = [
  { label: 'Announcements' },
  { icon: IconGauge, label: 'Profile', href: '/profile' },
  {
    icon: IconFingerprint,
    label: 'Security',
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
  },
  { icon: IconActivity, label: 'Activity', description: 'gfg' },
];

export function NavLinks() {
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      
      href={item.href}
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      // icon={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => setActive(index)}
    >
     {/* <Profile /> */}
    </NavLink>
  ));

  return <Box>{items}</Box>;
}
