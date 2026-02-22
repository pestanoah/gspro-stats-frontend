export type Shot = {
  id: string
  shot_key: string
  course_name: string
  round_date: string // ISO format date string
  shot_time: string // hh:mm:ss.sss format
  hole: number | null
  shot_number: number | null
  global_shot_number: number
  club_name: string
  club_speed: number // in mph
  ball_speed: number // in mph
  carry_distance: number // in yards
  total_distance: number // in yards
  offline: number // in yards
  peak_height: number // in yards
  descent_angle: number // in degrees
  horizontal_launch_angle: number // in degrees
  vertical_launch_angle: number // in degrees
  back_spin: number // in rpm
  spin_axis: number // in degrees
  club_angle_of_attack: number // in degrees
  club_path: number // in degrees
  club_face_to_path: number // in degrees
  club_face_to_target: number | null // in degrees
}
