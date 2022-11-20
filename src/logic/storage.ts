import { useStorageLocal } from '~/composables/useStorageLocal'

export const storageDemo = useStorageLocal('get-note', false, { listenToStorageChanges: true })
