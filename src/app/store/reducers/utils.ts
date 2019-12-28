import { IState } from '../state/generics';
import { Bean } from 'src/app/models/interfaces';

export function removeItemFromMap<T>(itemId: string, state: IState<T>): Record<string, T> {
    let mapWithoutItem: Record<string, T>;
    let item: T;
    ({ [itemId]: item, ...mapWithoutItem } = state.byId);
    return mapWithoutItem;
}

type RecordPredicate = ([key, val]) => boolean;
export function filterMapByIds<T extends Bean>(ids: string[], state: IState<T>) {
    const filter: RecordPredicate = ([key, val]) => !ids.includes(key);
    return filterMapByRecordPredicate(filter, state);
}

export function filterMapByRecordPredicate<T extends Bean>(predicate: RecordPredicate, state: IState<T>) {
    const newMap = Object.entries(state.byId)
        .filter(predicate)
        .reduce((map, obj) => add2Map<T>(obj, map), {});
    return newMap;
}

export function createMapFromBeanArray<T extends Bean>(beans: T[]): Record<string, T> {
    return beans.map(bean => ({ 0: bean.id, 1: bean }))
        .reduce((map, obj) => add2Map<T>(obj, map), {});
}
function add2Map<T extends Bean>(obj: { 0: string; 1: T; }, map: {}) {
    const key = obj[0];
    map[key] = obj[1];
    return map;
}

export function moveItemInArray(array: string[], index: number, offset: number) {
    const item2Move = array.splice(index, 1)[0];
    array.splice(index + offset, 0, item2Move);
}
