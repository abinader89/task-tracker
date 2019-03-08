defmodule TaskTracker.Repo.Migrations.CreateTimeblocks do
  use Ecto.Migration

  def change do
    create table(:timeblocks) do
      add :start, :string
      add :end, :string
      add :task_id, references(:tasks, on_delete: :nothing)

      timestamps()
    end

    create index(:timeblocks, [:task_id])
  end
end
