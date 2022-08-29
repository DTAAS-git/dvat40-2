import { useQuasar } from 'quasar'
import { computed } from 'vue'
import utils from '~/libs/utils.js'
import { useAnnotationStore } from '~/store/annotation.js'
import { useConfigurationStore } from '~/store/configuration'
import { usePreferenceStore } from '~/store/preference.js'

export const frameIndicator = () => {
  const ALWAYS_SHOW = true // TODO: load from preferenceStore

  const HEIGHT_UNIT = 16
  const HEIGHT_MARKER = 8

  const COLOR_BACKGROUND = 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))'
  const COLOR_BACKGROUND_DARK = 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))'
  // const COLOR_KEYFRAME = 'linear-gradient(#000, #000)'
  const COLOR_OBJECT = 'linear-gradient(var(--q-primary), var(--q-primary))'
  const COLOR_REGION = 'linear-gradient(var(--q-info), var(--q-info))'
  const COLOR_SKELETON = 'linear-gradient(var(--q-positive), var(--q-positive))'

  const annotationStore = useAnnotationStore()
  const preferenceStore = usePreferenceStore()
  // useConfigurationStore 추가
  const configurationStore = useConfigurationStore()
  const q = useQuasar()

  let bgImageList = []
  let bgPositionList = []
  let bgSizeList = []

  const getBackgroundStyleList = (positionHeightOffset = 0) => {
    bgImageList.push(q.dark.isActive ? COLOR_BACKGROUND_DARK : COLOR_BACKGROUND)
    bgPositionList.push(
      `0% ${12 + positionHeightOffset}px`)
    bgSizeList.push(`100% ${HEIGHT_MARKER}px`)
  }

  const getStyleList = (frameList, colorList, positionHeightOffset = 0) => {
    const markerWidthUnit = 100 / (annotationStore.video.frames - 1)
    for (let i = 0; i < frameList.length; i++) {
      const [frame, width] = frameList[i]
      const markerWidth = width * markerWidthUnit
      bgImageList.push(colorList[i])
      bgPositionList.push(
        `${10000 * frame / (annotationStore.video.frames - 1) / (100 - markerWidth) - 0.5 * markerWidthUnit}% ${12 +
        positionHeightOffset}px`)
      bgSizeList.push(`${markerWidth}% ${HEIGHT_MARKER}px`)
    }
  }

  const rangeStyle = computed(() => {
    bgImageList = []
    bgPositionList = []
    bgSizeList = []

    let positionHeightOffset = 0

    // getStyleList(
    //   annotationStore.keyframeList.map(keyframe => [keyframe, 1]),
    //   annotationStore.keyframeList.map(() => COLOR_KEYFRAME),
    //   positionHeightOffset
    // )

    // if (preferenceStore.objects) {
    //   const frameList = Object.entries(annotationStore.objectAnnotationListMap).
    //     filter(([, annotationList]) => annotationList.length).
    //     map(([frame]) => [parseInt(frame), 1])
    //   if (ALWAYS_SHOW || frameList.length) {
    //     positionHeightOffset += HEIGHT_UNIT
    //     getBackgroundStyleList(positionHeightOffset)
    //     getStyleList(
    //       frameList,
    //       frameList.map(() => COLOR_OBJECT),
    //       positionHeightOffset
    //     )
    //   }
    // }

    // if (preferenceStore.regions) {
    //   const frameList = Object.entries(annotationStore.regionAnnotationListMap).
    //     filter(([, annotationList]) => annotationList.length).
    //     map(([frame]) => [parseInt(frame), 1])
    //   if (ALWAYS_SHOW || frameList.length) {
    //     positionHeightOffset += HEIGHT_UNIT
    //     getBackgroundStyleList(positionHeightOffset)
    //     getStyleList(
    //       frameList,
    //       frameList.map(() => COLOR_REGION),
    //       positionHeightOffset
    //     )
    //   }
    // }

    // if (preferenceStore.skeletons) {
    //   const frameList = Object.entries(annotationStore.skeletonAnnotationListMap).
    //     filter(([, annotationList]) => annotationList.length).
    //     map(([frame]) => [parseInt(frame), 1])
    //   if (ALWAYS_SHOW || frameList.length) {
    //     positionHeightOffset += HEIGHT_UNIT
    //     getBackgroundStyleList(positionHeightOffset)
    //     getStyleList(
    //       frameList,
    //       frameList.map(() => COLOR_SKELETON),
    //       positionHeightOffset
    //     )
    //   }
    // }

    //appearance id 1
    if (preferenceStore.actions) {
      const frameList = []
      const colorList = []
      for (let i = 0; i < annotationStore.actionAnnotationList.length; i++) {
        const action = annotationStore.actionAnnotationList[i]
        const startFrame = action.start
        const endFrame = action.end
        if (annotationStore.actionAnnotationList[i].appearance_id === 1){
          frameList.push([startFrame, (endFrame - startFrame + 1)])
          // colorList.push(`linear-gradient(${action.color}, ${action.color})`)
          colorList.push(`linear-gradient(${configurationStore.objectLabelData.find(label => label.id === action.object).color}, ${configurationStore.objectLabelData.find(label => label.id === action.object).color})`)
        }
      }
      if (ALWAYS_SHOW || frameList.length) {
        positionHeightOffset += HEIGHT_UNIT
        getBackgroundStyleList(positionHeightOffset)
        // // color 직접 지정 -> 지정시 오류
        // bgImageList.push('linear-gradient(rgba(255, 235, 238, 1), rgba(255, 235, 238, 1))');
        // bgPositionList.push(
        //   `0% ${12 + positionHeightOffset}px`)
        // bgSizeList.push(`100% ${HEIGHT_MARKER}px`)
        // // //
        getStyleList(
          frameList,
          colorList,
          positionHeightOffset
        )
      }
    }

    //appearance id 2
    if (preferenceStore.actions) {
      const frameList = []
      const colorList = []
      for (let i = 0; i < annotationStore.actionAnnotationList.length; i++) {
        const action = annotationStore.actionAnnotationList[i]
        const startFrame = action.start
        const endFrame = action.end
        if (annotationStore.actionAnnotationList[i].appearance_id === 2){
          frameList.push([startFrame, (endFrame - startFrame + 1)])
          // colorList.push(`linear-gradient(${action.color}, ${action.color})`)
          colorList.push(`linear-gradient(${configurationStore.objectLabelData.find(label => label.id === action.object).color}, ${configurationStore.objectLabelData.find(label => label.id === action.object).color})`)
        }
      }
      if (ALWAYS_SHOW || frameList.length) {
        positionHeightOffset += HEIGHT_UNIT
        getBackgroundStyleList(positionHeightOffset)
        // // color 직접 지정
        // bgImageList.push('linear-gradient(rgba(255, 253, 231, 1), rgba(255, 253, 231, 1))');
        // bgPositionList.push(
        //   `0% ${12 + positionHeightOffset}px`)
        // bgSizeList.push(`100% ${HEIGHT_MARKER}px`)
        // // //
        getStyleList(
          frameList,
          colorList,
          positionHeightOffset
        )
      }
    }

    //appearance id 3
    if (preferenceStore.actions) {
      const frameList = []
      const colorList = []
      for (let i = 0; i < annotationStore.actionAnnotationList.length; i++) {
        const action = annotationStore.actionAnnotationList[i]
        const startFrame = action.start
        const endFrame = action.end
        if (annotationStore.actionAnnotationList[i].appearance_id === 3){
          frameList.push([startFrame, (endFrame - startFrame + 1)])
          // colorList.push(`linear-gradient(${action.color}, ${action.color})`)
          colorList.push(`linear-gradient(${configurationStore.objectLabelData.find(label => label.id === action.object).color}, ${configurationStore.objectLabelData.find(label => label.id === action.object).color})`)
        }
      }
      if (ALWAYS_SHOW || frameList.length) {
        positionHeightOffset += HEIGHT_UNIT
        getBackgroundStyleList(positionHeightOffset)
        // // color 직접 지정
        // bgImageList.push('linear-gradient(rgba(232, 245, 233, 1), rgba(232, 245, 233, 1))');
        // bgPositionList.push(
        //   `0% ${12 + positionHeightOffset}px`)
        // bgSizeList.push(`100% ${HEIGHT_MARKER}px`)
        // // //
        getStyleList(
          frameList,
          colorList,
          positionHeightOffset
        )
      }
    }

    //appearance id 4
    if (preferenceStore.actions) {
      const frameList = []
      const colorList = []
      for (let i = 0; i < annotationStore.actionAnnotationList.length; i++) {
        const action = annotationStore.actionAnnotationList[i]
        const startFrame = action.start
        const endFrame = action.end
        if (annotationStore.actionAnnotationList[i].appearance_id === 4){
          frameList.push([startFrame, (endFrame - startFrame + 1)])
          // colorList.push(`linear-gradient(${action.color}, ${action.color})`)
          colorList.push(`linear-gradient(${configurationStore.objectLabelData.find(label => label.id === action.object).color}, ${configurationStore.objectLabelData.find(label => label.id === action.object).color})`)
        }
      }
      if (ALWAYS_SHOW || frameList.length) {
        positionHeightOffset += HEIGHT_UNIT
        getBackgroundStyleList(positionHeightOffset)
        // // color 직접 지정
        // bgImageList.push('linear-gradient(rgba(227, 242, 253, 1), rgba(227, 242, 253, 1))');
        // bgPositionList.push(
        //   `0% ${12 + positionHeightOffset}px`)
        // bgSizeList.push(`100% ${HEIGHT_MARKER}px`)
        // // //
        getStyleList(
          frameList,
          colorList,
          positionHeightOffset
        )
      }
    }

    return {
      '--marker-height': `${32 + positionHeightOffset}px`,
      '--marker-bg-image': bgImageList.join(','),
      '--marker-bg-position': bgPositionList.join(','),
      '--marker-bg-size': bgSizeList.join(',')
    }
  })
  return {
    rangeStyle
  }
}
