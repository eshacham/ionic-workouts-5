import { ExerciseMediaBean } from '../models/ExerciseMedia';
import { MediaDataMaps } from '../models/interfaces';
import { Muscles } from '../models/enums';

const addMedia = (map: Map<string, ExerciseMediaBean>, id: string, images: string[], muscles: Muscles[]) => {
    const media = new ExerciseMediaBean({
        id,
        name: id,
        images,
        muscles: new Set(muscles),
        isDefault: true,
    });
    map.set(media.id, media);
};
// tslint:disable: max-line-length
const buildExercisesMediaMap = (): Map<string, ExerciseMediaBean> => {
    const exercises = new Map<string, ExerciseMediaBean>();
    // Upper Body
    addMedia(exercises, 'bent dumbbells lateral raise', ['bent dumbbells lateral raise.jpg'], [Muscles.Shoulders, Muscles.Forearms, Muscles.Traps, Muscles.Back]);
    addMedia(exercises, 'lateral raises', ['dumbbells lateral raises.jpg'], [Muscles.Forearms, Muscles.Chest, Muscles.Obliques]);
    addMedia(exercises, 'bent triceps extensions', ['bent triceps extension dumbbell 1.jpg', 'bent triceps extension dumbbell 2.jpg'], [Muscles.Triceps, Muscles.Forearms]);
    addMedia(exercises, 'cable lat pulldown', ['cable lat pulldown.jpg'], [Muscles.Shoulders, Muscles.Forearms, Muscles.Traps]);
    addMedia(exercises, 'upright row', ['dumbbell upright row.jpg'], [Muscles.Shoulders, Muscles.Forearms, Muscles.Traps, Muscles.Back]);
    addMedia(exercises, 'seated shoulder press', ['seated shoulder press.jpg'], [Muscles.Shoulders, Muscles.Chest, Muscles.Forearms]);
    addMedia(exercises, 'standing triceps extension', ['standing triceps extension dumbbell 1.jpg', 'standing triceps extension dumbbell 2.jpg'], [Muscles.Shoulders, Muscles.Triceps, Muscles.Forearms]);
    // Lower Body
    addMedia(exercises, 'braced squats', ['braced squats.jpg'], [Muscles.Quads, Muscles.Glutes, Muscles.Hamstrings, Muscles.Longus]);
    addMedia(exercises, 'cable kickbacks', ['glutes cable kickbacks.jpg'], [Muscles.Glutes, Muscles.Hamstrings]);
    addMedia(exercises, 'squat', ['dumbbell squat.jpg'], [Muscles.Quads, Muscles.Glutes, Muscles.Hamstrings, Muscles.Longus]);
    addMedia(exercises, 'cable crossover', ['hip cable crossover.jpg'], [Muscles.Adductors, Muscles.Longus, Muscles.Obliques]);
    addMedia(exercises, 'single leg squats', ['single leg squats.jpg'], [Muscles.Quads, Muscles.Longus, Muscles.Hamstrings]);
    // cardio
    addMedia(exercises, 'elliptical', ['elliptical.jpg'], [Muscles.Cardio, Muscles.Calves, Muscles.Longus, Muscles.Quads]);
    // core
    addMedia(exercises, 'fitball crunches', ['fitball crunches.jpg'], [Muscles.Abs, Muscles.Obliques]);
    addMedia(exercises, 'russian twist', ['russian twist.jpg'], [Muscles.Abs, Muscles.Obliques]);
    addMedia(exercises, 'plank', ['plank.jpg'], [Muscles.Forearms, Muscles.Abs, Muscles.Obliques, Muscles.Shoulders]);
    addMedia(exercises, 'side plank hip raise', ['side plank hip raise.jpg'], [Muscles.Abs, Muscles.Obliques]);
    addMedia(exercises, 'v up', ['v up.jpg'], [Muscles.Abs, Muscles.Obliques]);

    return exercises;
};

let defaultExerciseMedia: Map<string, ExerciseMediaBean>;
const getDefaultExerciseMedia = (): Map<string, ExerciseMediaBean> => {
    if (!defaultExerciseMedia) {
        defaultExerciseMedia = buildExercisesMediaMap();
    }
    return defaultExerciseMedia;
};

export const attachMedia2Exercise = (id: string): string => {
    const media = getDefaultExerciseMedia().get(id);
    return media.id;
};

export const getDefaultImages = (): MediaDataMaps => {
    const data: MediaDataMaps = {
        media: { byId: {} }
    };
    Array.from(getDefaultExerciseMedia()).map(([key, media]) => {
        data.media.byId[media.id] = media;
    });
    return data;
};
