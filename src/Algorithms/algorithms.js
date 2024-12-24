// Naive merge sort with multiple array creation
/* 
export const mergeSort = (array) => {
  if (array.length == 1) return array;

  const mid = Math.floor(array.length / 2);
  const firstHalf = mergeSort(array.slice(0, mid));
  const secondHalf = mergeSort(array.slice(mid));
  const sorted = [];

  let i = 0,
    j = 0;

  while (i < firstHalf.length && j < secondHalf.length) {
    if (firstHalf[i] < secondHalf[j]) {
      sorted.push(firstHalf[i]);
      i++;
    } else {
      sorted.push(secondHalf[j]);
      j++;
    }
  }

  while (i < firstHalf.length) {
    sorted.push(firstHalf[i]);
    i++;
  }

  while (j < secondHalf.length) {
    sorted.push(secondHalf[j]);
    j++;
  }

  return sorted;
};
*/

// Efficient merge sort
export function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) return array;

  const aux = array.slice();

  msHelper(array, 0, array.length - 1, aux, animations);

  return animations;
}

function msHelper(arrayMain, start, end, arrayAux, animations) {
  if (start == end) return;

  const middle = Math.floor((start + end) / 2);
  msHelper(arrayAux, start, middle, arrayMain, animations);
  msHelper(arrayAux, middle + 1, end, arrayMain, animations);

  merge(arrayMain, start, middle, end, arrayAux, animations);
}

function merge(arrayMain, start, middle, end, arrayAux, animations) {
  let k = start;
  let i = start;
  let j = middle + 1;

  while (i <= middle && j <= end) {
    animations.push([i, j]); // push values under comparison to change colors
    animations.push([i, j]); // push values under comparison to get back original color

    if (arrayAux[i] <= arrayAux[j]) {
      animations.push([k, arrayAux[i]]);
      arrayMain[k++] = arrayAux[i++];
    } else {
      animations.push([k, arrayAux[j]]);
      arrayMain[k++] = arrayAux[j++];
    }
  }

  while (i <= middle) {
    animations.push([i, i]); // change color
    animations.push([i, i]); // color back to normal
    animations.push([k, arrayAux[i]]);
    arrayMain[k++] = arrayAux[i++];
  }

  while (j <= end) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, arrayAux[j]]);
    arrayMain[k++] = arrayAux[j++];
  }
}
