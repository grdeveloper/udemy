import * as React from 'react';

export const LazyState: React.FC<LazyStateProps> = ({loadState, children}) => {
    const [State, setState] = React.useState<React.FC<any>>(React.Fragment);

    React.useEffect(() => {
        (async () => {
            try {
                const module = await loadState();
                setState(() => module.default);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return <State>{children}</State>;
};

interface LazyStateProps {
    loadState(): Promise<{default: React.FC<any>}>;
    children: React.ReactNode;
}
