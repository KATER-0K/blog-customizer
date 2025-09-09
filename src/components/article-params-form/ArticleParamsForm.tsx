import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, useEffect } from 'react';

import styles from './ArticleParamsForm.module.scss';

import { clsx } from 'clsx';

import { Text } from 'src/ui/text';

import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	defaultArticleState,
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

type ArticleState = typeof defaultArticleState;

import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	formParams: ArticleState;
	setFormParams: (params: ArticleState) => void;
	onApply: (params: ArticleState) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	formParams,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [tempSettings, setTempSettings] = useState<ArticleState>(formParams);
	const [initialSettings, setInitialSettings] =
		useState<ArticleState>(formParams);
	const [isOpen, setIsOpen] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: panelRef,
		onChange: () => setIsOpen(false),
	});

	useEffect(() => {
		if (isOpen) {
			setInitialSettings(formParams);
			setTempSettings(formParams);
		}
	}, [isOpen, formParams]);

	const handleApply = () => {
		onApply(tempSettings);
		setIsOpen(false);
	};

	const handleReset = () => {
		setTempSettings(initialSettings);
		onReset();
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={panelRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleApply();
					}}>
					<Text weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={tempSettings.fontFamilyOption}
						onChange={(value) =>
							setTempSettings({ ...tempSettings, fontFamilyOption: value })
						}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontsize'
						options={fontSizeOptions}
						selected={tempSettings.fontSizeOption}
						onChange={(value) =>
							setTempSettings({ ...tempSettings, fontSizeOption: value })
						}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={tempSettings.fontColor}
						onChange={(value) =>
							setTempSettings({ ...tempSettings, fontColor: value })
						}
						title='Цвет шрифта'
					/>

					<Separator />
					<Select
						options={backgroundColors}
						selected={tempSettings.backgroundColor}
						onChange={(value) =>
							setTempSettings({ ...tempSettings, backgroundColor: value })
						}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={tempSettings.contentWidth}
						onChange={(value) =>
							setTempSettings({ ...tempSettings, contentWidth: value })
						}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
