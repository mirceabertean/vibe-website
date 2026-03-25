-- Creare tabel rezervari
CREATE TABLE rezervari (
  id          BIGSERIAL PRIMARY KEY,
  nume        TEXT NOT NULL,
  email       TEXT NOT NULL,
  telefon     TEXT NOT NULL,
  persoane    INT NOT NULL DEFAULT 2,
  data_ora    TIMESTAMPTZ NOT NULL,
  status      TEXT NOT NULL DEFAULT 'în așteptare',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: activare securitate la nivel de rând
ALTER TABLE rezervari ENABLE ROW LEVEL SECURITY;

-- Policy: oricine poate adăuga rezervări
CREATE POLICY "Allow insert for all" ON rezervari
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Policy: oricine poate citi rezervări
CREATE POLICY "Allow select for all" ON rezervari
  FOR SELECT TO anon, authenticated USING (true);

-- Policy: oricine poate modifica rezervări
CREATE POLICY "Allow update for all" ON rezervari
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- Policy: oricine poate șterge rezervări
CREATE POLICY "Allow delete for all" ON rezervari
  FOR DELETE TO anon, authenticated USING (true);
