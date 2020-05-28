import { ExerciseMediaBean } from '../models/ExerciseMedia';
import { MediaDataMaps } from '../models/interfaces';
import { Muscles } from '../models/enums';

const addMedia = (map: Map<string, ExerciseMediaBean>, id: string, images: string[], muscles: Muscles[], description: string) => {
    const media = new ExerciseMediaBean({
        id,
        name: id,
        description,
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
    addMedia(
        exercises,
        'bent dumbbells lateral raise',
        ['bent dumbbells lateral raise.jpg'],
        [Muscles.Shoulders, Muscles.Forearms, Muscles.Traps, Muscles.Back],
        'Standing with a dumbbell in each hand, bend over at the hips until your torso is just about parallel to the floor. Keep your chest out, back flat and your knees slightly bent, and let the dumbbells hang directly beneath you with your elbows straight but not locked out, palms facing each other.',
    );
    addMedia(
        exercises,
        'lateral raises',
        ['dumbbells lateral raises.jpg'],
        [Muscles.Forearms, Muscles.Chest, Muscles.Obliques],
        'Grasp dumbbells in front of thighs with elbows slightly bent. Bend over slightly with hips and knees bent slightly. Raise upper arms to sides until elbows are shoulder height. Maintain elbows height above or equal to wrists. Lower and repeat.',
    );
    addMedia(
        exercises,
        'bent triceps extensions',
        ['bent triceps extension dumbbell 1.jpg',
        'bent triceps extension dumbbell 2.jpg'],
        [Muscles.Triceps, Muscles.Forearms],
        'Bent over and place your left hand on yor knee. Grab a dumbbell with your right hand. Your upper arm should be parallel to the floor and arm bent at the elbow with the lower arm straight down. Slowly extend your arm back until your arm is fully extended.',
    );
    addMedia(
        exercises,
        'cable lat pulldown',
        ['cable lat pulldown.jpg'],
        [Muscles.Shoulders, Muscles.Forearms, Muscles.Traps],
        'Grasp cable bar with wide grip. Sit with thighs under supports. Pull down cable bar to upper chest. Return until arms and shoulders are fully extended.',
    );
    addMedia(
        exercises,
        'upright row',
        ['dumbbell upright row.jpg'],
        [Muscles.Shoulders, Muscles.Forearms, Muscles.Traps, Muscles.Back],
        'Hold the dumbbells in front of your body, pull the weight vertically to about neck height and then lower under control.',
    );
    addMedia(
        exercises,
        'seated shoulder press',
        ['seated shoulder press.jpg'],
        [Muscles.Shoulders, Muscles.Chest, Muscles.Forearms],
        'Hold a dumbbell in each hand and sit on a bench with back support. Bend your elbows and raise your upper arms to shoulder height so the dumbbells are at ear level. Push the dumbbells up and in until the ends of the dumbbells touch lightly, directly over your head, and then lower the dumbbells back to ear level.',
    );
    addMedia(
        exercises,
        'standing triceps extension',
        ['standing triceps extension dumbbell 1.jpg', 'standing triceps extension dumbbell 2.jpg'],
        [Muscles.Shoulders, Muscles.Triceps, Muscles.Forearms],
        'Stand tall and hold a dumbbell with one hand directly above your head. Place the other hand on your hip. Slowly flex your elbow and lower the weight behind your head as you keep your upper arm still. Extend your arm and repeat.',
    );
    // Lower Body
    addMedia(
        exercises,
        'braced squats',
        ['braced squats.jpg'],
        [Muscles.Quads, Muscles.Glutes, Muscles.Hamstrings, Muscles.Longus],
        'Keeping your elbows straight, raise the weights directly in front of you. Perform a squat, bending your knees and dropping your hips to the ground. Pause for a moment at the bottom, then push through your heels to return to the starting position.',
    );
    addMedia(
        exercises,
        'cable kickbacks',
        ['glutes cable kickbacks.jpg'],
        [Muscles.Glutes, Muscles.Hamstrings],
        'With the ankle strap on and facing the pully, the clip should attach at the front of your ankle. Step back a bit so you feel some resistance. Bend your knees slightly and keep your abs tight. Slowly kick your leg back until your hip is extended and your glute is contracted. Holding it for 1-2 seconds and return back to the starting position.',
        );
    addMedia(
        exercises,
        'squat',
        ['dumbbell squat.jpg'],
        [Muscles.Quads, Muscles.Glutes, Muscles.Hamstrings, Muscles.Longus],
        'Stand with your feet hip to shoulder-width apart, holding a pair of dumbbells at arm\'s length by your sides. Keeping your back flat and core braced, push your hips back, bend your knees, and lower your body until your thighs are parallel to the floor. Pause, then push yourself back up to the starting position.',
    );
    addMedia(
        exercises,
        'cable crossover',
        ['hip cable crossover.jpg'],
        [Muscles.Adductors, Muscles.Longus, Muscles.Obliques],
        'Lower the cable to the lowest position and put on an ankle cuff. Stand perpendicular to the machine and lift your leg out to the side (away from the machine).',
    );
    addMedia(
        exercises,
        'single leg squats',
        ['single leg squats.jpg'],
        [Muscles.Quads, Muscles.Longus, Muscles.Hamstrings],
        'Stand on one leg with your foot pointing straight ahead and the knee of the other leg slightly bent. Raise the non-supporting foot from the floor and bend it over the knee of the supporting leg. Lower to a squat position, keeping the knee of the supporting leg centered over the ball of the foot.',
    );
    // cardio
    addMedia(
        exercises,
        'elliptical',
        ['elliptical.jpg'],
        [Muscles.Cardio, Muscles.Calves, Muscles.Longus, Muscles.Quads],
        '',
    );
    // core
    addMedia(
        exercises,
        'fitball crunches',
        ['fitball crunches.jpg'],
        [Muscles.Abs, Muscles.Obliques],
        'Sit on the ball and "walk" your feet out until you are lying on your back, with your thighs parallel to the floor and your knees at a right angle, and put your hands behind your head. Keeping your core engaged and your spine neutral, bring your shoulders up toward the ceiling a few inches, then lower back to the starting position.',
    );
    addMedia(
        exercises,
        'russian twist',
        ['russian twist.jpg'],
        [Muscles.Abs, Muscles.Obliques],
        'Start by sitting on the floor, with your knees bent and feet flat on the ground. Then lean back so your upper body is at a 45-degree angle to the floor.  Link your hands together in front of your chest, then brace your core and raise your legs up off the ground. Rotate your arms all the way over to one side, then do the same in the other direction.',
    );
    addMedia(
        exercises,
        'plank',
        ['plank.jpg'],
        [Muscles.Forearms, Muscles.Abs, Muscles.Obliques, Muscles.Shoulders],
        'Place forearms on the floor with elbows aligned below shoulders and arms parallel to your body at about shoulder width. If flat palms bother your wrists, clasp your hands together.',
    );
    addMedia(
        exercises,
        'side plank hip raise',
        ['side plank hip raise.jpg'],
        [Muscles.Abs, Muscles.Obliques],
        'Start on your side with your feet together and one forearm directly below your shoulder. Contract your core and raise your hips until your body is in a straight line from head to feet. Hold the position without letting your hips drop for the allotted time for each set, then repeat on the other side.',
    );
    addMedia(
        exercises,
        'v up',
        ['v up.jpg'],
        [Muscles.Abs, Muscles.Obliques],
        'Lay on the ground with your back flat to the ground and your arms and legs pointing straight up. At the same time, slowly lower your legs towards the ground. Raise your arms above your head so that you end up in a banana-like position.',
    );

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
