import React from 'react';
import {
  FaBook,
  FaBullhorn,
  FaChartLine,
  FaCode,
  FaFileAlt,
  FaMoneyBillWave,
  FaRobot,
  FaShieldAlt,
  FaUsers,
} from 'react-icons/fa';

const ICON_CLASS = 'text-5xl mb-4';

/** Icon name (from the locale JSON) -> rendered icon, with its accent colour. */
const ICONS: Record<string, React.ReactNode> = {
  FaRobot: <FaRobot className={`${ICON_CLASS} text-blue-500`} />,
  FaFileAlt: <FaFileAlt className={`${ICON_CLASS} text-green-500`} />,
  FaChartLine: <FaChartLine className={`${ICON_CLASS} text-pink-500`} />,
  FaBullhorn: <FaBullhorn className={`${ICON_CLASS} text-yellow-400`} />,
  FaBook: <FaBook className={`${ICON_CLASS} text-red-500`} />,
  FaUsers: <FaUsers className={`${ICON_CLASS} text-blue-400`} />,
  FaCode: <FaCode className={`${ICON_CLASS} text-purple-400`} />,
  FaMoneyBillWave: <FaMoneyBillWave className={`${ICON_CLASS} text-green-400`} />,
  FaShieldAlt: <FaShieldAlt className={`${ICON_CLASS} text-indigo-400`} />,
};

export const getExampleIcon = (name: string): React.ReactNode => ICONS[name] ?? ICONS.FaRobot;
