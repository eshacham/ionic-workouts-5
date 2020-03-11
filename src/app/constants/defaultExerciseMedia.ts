import { ExerciseMediaBean } from '../models/ExerciseMedia';
import { MediaDataMaps } from '../models/interfaces';
import { Muscles } from '../models/enums';

const addMedia = (map: Map<string, ExerciseMediaBean>, id: string, images: string[], muscles: Muscles[]) => {
    const media = ExerciseMediaBean.create(id, id, images, new Set(muscles));
    map.set(media.id, media);
};

const buildExercisesMediaMap = (): Map<string, ExerciseMediaBean> => {
    const exercises = new Map<string, ExerciseMediaBean>();
    addMedia(exercises, 'BenchPressWideGrip', ['BenchPressWideGrip1.jpeg', 'BenchPressWideGrip2.jpeg'], [Muscles.Chest]);
    addMedia(exercises, 'BenchPressNarrowGrip', ['BenchPressNarrowGrip.png'], [Muscles.Chest]);
    addMedia(exercises, 'BodyweightFlutterKicks', ['BodyweightFlutterKicks.png'], [Muscles.Glutes, Muscles.Hamstrings]);
    addMedia(exercises, 'CabelLatPulldownBehindNeckWideGrip',
        ['CabelLatPulldownBehindNeckWideGrip.png'], [Muscles.Shoulders, Muscles.Forearms]);
    addMedia(exercises, 'CableAbduction', ['CableAbduction.png'], [Muscles.Abductors]);
    addMedia(exercises, 'CableAdduction', ['CableAdduction.png'], [Muscles.Adductors]);
    addMedia(exercises, 'CableBicepsCurlUnderhandGrip', ['CableBicepsCurlUnderhandGrip.png'], [Muscles.Biceps, Muscles.Forearms]);
    addMedia(exercises, 'CableCalfRaise', ['CableCalfRaise.png'], [Muscles.Calves]);
    addMedia(exercises, 'CableFly', ['CableFly.png'], [Muscles.Chest]);
    addMedia(exercises, 'CableLegCurl', ['CableLegCurl.png'], [Muscles.Hamstrings]);
    addMedia(exercises, 'CableShrug', ['CableShrug.png'], [Muscles.Neck]);
    addMedia(exercises, 'CableTricepsPushdownOverheadGrip', ['CableTricepsPushdownOverheadGrip.png'], [Muscles.Forearms, Muscles.Triceps]);
    addMedia(exercises, 'CrossBodyCrunch', ['CrossBodyCrunch.png'], [Muscles.Core, Muscles.Abs]);
    addMedia(exercises, 'DeclineDumbbellPullover', ['DeclineDumbbellPullover.png'], [Muscles.Core, Muscles.Abs]);
    addMedia(exercises, 'CrossfitSitup', ['CrossfitSitup.png'], [Muscles.Core, Muscles.Abs]);
    addMedia(exercises, 'DeclineSitups', ['DeclineSitups.png'], [Muscles.Core, Muscles.Abs]);
    addMedia(exercises, 'DragonFlags', ['DragonFlags.png'], [Muscles.Core, Muscles.Abs]);
    addMedia(exercises, 'DumbbellArmCircles', ['DumbbellArmCircles.png'], [Muscles.Shoulders]);
    addMedia(exercises, 'DumbbellBenshPressRotatingGrip', ['DumbbellBenshPressRotatingGrip.png'], [Muscles.Chest]);
    addMedia(exercises, 'DumbbellFly', ['DumbbellFly.png'], [Muscles.Chest]);
    addMedia(exercises, 'DumbbellHorizontalRowInclineProne', ['DumbbellHorizontalRowInclineProne.png'], [Muscles.Chest]);
    addMedia(exercises, 'DumbbellTricepsExtensionSeated', ['DumbbellTricepsExtensionSeated.png'], [Muscles.Triceps]);
    addMedia(exercises, 'DumbbellWristCurl', ['DumbbellWristCurl.png'], [Muscles.Fingers]);
    addMedia(exercises, 'DummbellBicepsCurlStandingUnderhandGrip', ['DummbellBicepsCurlStandingUnderhandGrip.png'], [Muscles.Biceps]);
    addMedia(exercises, 'InclinePushupNarrowGrip', ['InclinePushupNarrowGrip.jpg'], [Muscles.Core, Muscles.Abs, Muscles.Chest]);
    addMedia(exercises, 'LegRaiseMachine', ['LegRaiseMachine.png'], [Muscles.Quads]);
    addMedia(exercises, 'LyingScissorsKicks', ['LyingScissorsKicks.png'], [Muscles.Glutes]);
    addMedia(exercises, 'MachineRowMediumGrip', ['MachineRowMediumGrip.png'], [Muscles.Lats]);
    addMedia(exercises, 'Plank', ['Plank.png'], [Muscles.Core, Muscles.Abs]);
    addMedia(exercises, 'ReverseCableFlyOnFlatBench', ['ReverseCableFlyOnFlatBench.png'], [Muscles.Chest]);
    addMedia(exercises, 'RussianTwist', ['RussianTwist.png'], [Muscles.Core, Muscles.Abs]);
    addMedia(exercises, 'SeatedRopeCableRow', ['SeatedRopeCableRow.png'], [Muscles.Forearms, Muscles.Back]);
    addMedia(exercises, 'Situps', ['Situps.png'], [Muscles.Core, Muscles.Abs]);
    addMedia(exercises, 'SitupsWithWeightAboveHead', ['SitupsWithWeightAboveHead.png'], [Muscles.Core, Muscles.Abs]);
    addMedia(exercises, 'Twist', ['Twist.png'], [Muscles.Core, Muscles.Abs]);
    addMedia(exercises, 'WalkingLungeWithSideWeights', ['WalkingLungeWithSideWeights.png'], [Muscles.Quads, Muscles.Forearms]);
    addMedia(exercises, 'WeightedSitups', ['WeightedSitups.png'], [Muscles.Core, Muscles.Abs]);

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
