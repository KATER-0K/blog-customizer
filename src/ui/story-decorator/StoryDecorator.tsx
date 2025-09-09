import { Decorator } from '@storybook/react-webpack5';
import styles from './StoryDecorator.module.scss';

export const StoryDecorator: Decorator = (Story) => (
	<div className={styles.storybookContainer}>
		<Story />
	</div>
);
