package fr.inti.apptest.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.inti.apptest.web.rest.TestUtil;

public class TopbarTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Topbar.class);
        Topbar topbar1 = new Topbar();
        topbar1.setId("id1");
        Topbar topbar2 = new Topbar();
        topbar2.setId(topbar1.getId());
        assertThat(topbar1).isEqualTo(topbar2);
        topbar2.setId("id2");
        assertThat(topbar1).isNotEqualTo(topbar2);
        topbar1.setId(null);
        assertThat(topbar1).isNotEqualTo(topbar2);
    }
}
