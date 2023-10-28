<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const matrix = ref<number[][]>([])
const size = ref<number>(2)
const determinant = ref<number>()
const showDeterminant = ref<boolean>(false)
function calculdeterminant(matrix: Array<number[]>) {
  const n = matrix.length
  for (let i = 0; i < n; i++) {
    if (matrix[i].length !== n) {
      throw new Error('Input matrix must be square')
    }
  }
  if (n === 1) {
    return matrix[0][0]
  }

  let det = 0
  for (let j = 0; j < n; j++) {
    const minorMatrix = matrix
      .slice(1)
      .map((row) => row.slice(0, j).concat(row.slice(j + 1)))
    const cofactor = matrix[0][j] * calculdeterminant(minorMatrix)
    if (j % 2 === 0) {
      det += cofactor
    } else {
      det -= cofactor
    }
  }

  return det
}
watchEffect(() => {
  showDeterminant.value = false
  if (size.value >= 2 && size.value <= 9) {
    matrix.value = []
    for (let i = 0; i < size.value; i++) {
      matrix.value.push(Array(size.value))
    }
  } else if (size.value * 1 === 0) {
    matrix.value = []
  } else if (size.value < 2) {
    size.value = 2
    matrix.value = []
    for (let i = 0; i < size.value; i++) {
      matrix.value.push(Array(size.value))
    }
  } else {
    size.value = 9
    matrix.value = []
    for (let i = 0; i < size.value; i++) {
      matrix.value.push(Array(size.value))
    }
  }
})
const autoSet = () => {
  for (let i = 0; i < size.value; i++) {
    for (let j = 0; j < size.value; j++) {
      matrix.value[i][j] = Math.floor(Math.random() * (100 - -100 + 1)) + -100
    }
  }
}
const onSubmit = () => {
  determinant.value = calculdeterminant(matrix.value)
  showDeterminant.value = true
}
</script>
<template>
  <h4>Determinant of a square matrix</h4>
  <div>
    <div class="d-flex gap-10">
      <label for="size">Choose the size of the matrix</label>
      <input v-model="size" class="input" type="number" id="size" />
    </div>
    <table>
      <body>
        <form @submit.prevent="onSubmit">
          <tr v-for="(n, indexp) in size" :key="indexp">
            <td v-for="(n, index) in size" :key="index">
              <input
                v-model="matrix[indexp][index]"
                type="number"
                class="matriceInput"
                required
              />
            </td>
          </tr>
          <div v-if="size" class="d-flex justify-content-end gap-10">
            <button @click="autoSet" type="button" class="btn btn-secondary">
              Auto set
            </button>
            <button type="submit" class="btn btn-danger">Generate</button>
          </div>
        </form>
        <div v-if="showDeterminant" class="mt-2">
          <label
            >The determinant is:<span class="determinant">{{
              determinant
            }}</span></label
          >
        </div>
      </body>
    </table>
  </div>
</template>

<style scoped>
.gap-10 {
  gap: 5px;
}
.input {
  width: 50px;
}
.matriceInput {
  margin: 10px;
  border: solid 1px;
  width: 100px;
}
.determinant {
  margin-left: 10px;
  font-weight: bold;
}
</style>
