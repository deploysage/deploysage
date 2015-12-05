class CreateRepos < ActiveRecord::Migration
  def change
    create_table :repos do |t|
      t.integer :github_identifier
      t.string :url

      t.timestamps
    end
  end
end
