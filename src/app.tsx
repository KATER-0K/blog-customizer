import { useState, useCallback, CSSProperties } from 'react';
import styles from './styles/index.module.scss';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

type ArticleState = typeof defaultArticleState;

export const App = () => {
	const [articleParams, setArticleParams] =
		useState<typeof defaultArticleState>(defaultArticleState);

	const handleApply = useCallback((settings: ArticleState) => {
		setArticleParams(settings);
	}, []);

	const handleReset = useCallback(() => {
		setArticleParams(defaultArticleState);
	}, []);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				formParams={articleParams}
				setFormParams={setArticleParams}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
