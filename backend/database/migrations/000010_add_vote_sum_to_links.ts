import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'links'


  async up () {
    this.schema.raw(`
      CREATE OR REPLACE FUNCTION update_total_votes()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Determine the link_id based on the trigger operation
          DECLARE
              affected_link_id INTEGER;
          BEGIN
              IF (TG_OP = 'DELETE') THEN
                  affected_link_id := OLD.link_id;
              ELSE
                  affected_link_id := NEW.link_id;
              END IF;
              
              -- Update total_votes in the links table
              UPDATE links
              SET vote_sum = (SELECT COALESCE(SUM(vote_value), 0) FROM votes WHERE link_id = affected_link_id)
              WHERE id = affected_link_id;
      
              -- Return value based on trigger operation
              IF (TG_OP = 'DELETE') THEN
                  RETURN OLD;
              ELSE
                  RETURN NEW;
              END IF;
          END;
      END;
      $$ LANGUAGE plpgsql;
    `);

    this.schema.raw(`
      CREATE TRIGGER trigger_update_votes_after_insert
      AFTER INSERT ON votes
      FOR EACH ROW
      EXECUTE FUNCTION update_total_votes();
    `);

    this.schema.raw(`
      CREATE TRIGGER trigger_update_votes_after_update
      AFTER UPDATE ON votes
      FOR EACH ROW
      EXECUTE FUNCTION update_total_votes();
    `);

    this.schema.raw(`
      CREATE TRIGGER trigger_update_votes_after_delete
      AFTER DELETE ON votes
      FOR EACH ROW
      EXECUTE FUNCTION update_total_votes();
    `);
  }

  async down () {
    this.schema.raw(`
      DROP TRIGGER IF EXISTS trigger_update_votes_after_insert ON votes;
      DROP TRIGGER IF EXISTS trigger_update_votes_after_update ON votes;
      DROP TRIGGER IF EXISTS trigger_update_votes_after_delete ON votes;

      DROP FUNCTION IF EXISTS update_total_votes() CASCADE;
    `);
  }
}