import {useClickOutside, useDidUpdate} from '@mantine/hooks';
import {functionalUpdate, RowSelectionState, Table} from '@tanstack/table-core';
import isEqual from 'fast-deep-equal';

import {useRef} from 'react';
import {RowSelectionWithData, TableProps, TableState} from './Table.types';

export const useRowSelection = <T>(
    table: Table<T>,
    {
        onRowSelectionChange,
        multiRowSelectionEnabled,
        additionalRootNodes = [],
    }: Pick<TableProps<T>, 'onRowSelectionChange' | 'multiRowSelectionEnabled' | 'additionalRootNodes'>,
) => {
    const outsideClickRef = useRef<HTMLDivElement>();
    useClickOutside(
        () => {
            if (!multiRowSelectionEnabled) {
                clearSelection();
            }
        },
        null,
        [outsideClickRef.current, ...additionalRootNodes],
    );

    // Need to call this outside of the onRowSelectionChange of the table to avoid rendering conflicts if the callback queues an update in a parent component.
    // See this warning introduced in React v.16.13.0: https://legacy.reactjs.org/blog/2020/02/26/react-v16.13.0.html#warnings-for-some-updates-during-render
    useDidUpdate(() => {
        onRowSelectionChange?.(getSelectedRows());
    }, [table.getState().rowSelection]);

    table.setOptions((prev) => ({
        ...prev,
        onRowSelectionChange: (rowSelectionUpdater) => {
            table.setState((old) => {
                const newRowSelection = functionalUpdate(
                    rowSelectionUpdater,
                    old['rowSelection'],
                ) as RowSelectionWithData<T>;

                if (isEqual(old['rowSelection'], newRowSelection)) {
                    return old;
                }

                const rows = table.getRowModel().rowsById;

                Object.keys(newRowSelection).forEach((rowId) => {
                    if (newRowSelection[rowId] === true) {
                        if (!rows[rowId]) {
                            console.error(
                                'The table was not initialized properly, the rowSelection state should contain an object of type Record<string, TData>.',
                            );
                        }
                        newRowSelection[rowId] = rows[rowId]?.original ?? (true as T);
                    }
                });

                return {
                    ...old,
                    rowSelection: newRowSelection as RowSelectionState,
                };
            });
        },
    }));

    const clearSelection = () => {
        table.resetRowSelection(true);
    };

    const getSelectedRows = () => Object.values((table.getState() as TableState<T>).rowSelection);

    const getSelectedRow = () => getSelectedRows()[0] ?? null;

    return {clearSelection, getSelectedRow, getSelectedRows, outsideClickRef};
};
