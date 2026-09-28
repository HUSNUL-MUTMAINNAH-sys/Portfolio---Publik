// Semua gambar di src/assets/photos otomatis terdeteksi — tidak perlu mengubah
// kode saat mengganti gambar. Arah dikenali dari kata di nama file:
//   depan/front, kiri/left, kanan/right, atas/top, bawah/down, kedip/blink
// Arah yang tidak ditemukan otomatis memakai gambar "depan"; jika tidak ada
// yang cocok sama sekali, dipakai gambar pertama di folder.
const files = import.meta.glob('../assets/photos/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const entries = Object.entries(files)
  .map(([path, url]) => [(path.split('/').pop() || '').toLowerCase(), url] as const)
  .sort((a, b) => a[0].localeCompare(b[0]))

const find = (...keys: string[]) => entries.find(([name]) => keys.some((k) => name.includes(k)))?.[1]

const front = find('depan', 'front') ?? entries[0]?.[1] ?? '/profile-placeholder.svg'

export const photos = {
  front,
  left: find('kiri', 'left') ?? front,
  right: find('kanan', 'right') ?? front,
  up: find('atas', 'top') ?? front,
  down: find('bawah', 'down') ?? front,
  blink: find('kedip', 'blink') ?? front,
}
